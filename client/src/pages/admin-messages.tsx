import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Send, CheckCircle2, Clock, User, AlertCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Message } from "@shared/schema";
import { format } from "date-fns";

export default function AdminMessages() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");

  // Check if user is admin
  const { data: adminCheck, isLoading: isCheckingAdmin } = useQuery<{ isAdmin: boolean }>({
    queryKey: ['/api/auth/is-admin'],
  });

  // Redirect if not admin
  useEffect(() => {
    if (!isCheckingAdmin && !adminCheck?.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      setLocation('/');
    }
  }, [adminCheck, isCheckingAdmin, setLocation, toast]);

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ['/api/admin/messages'],
    enabled: adminCheck?.isAdmin === true,
  });

  // Show loading state while checking admin status
  if (isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-background pb-24 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // Don't render anything if not admin (will redirect)
  if (!adminCheck?.isAdmin) {
    return null;
  }

  const respondMutation = useMutation({
    mutationFn: async ({ messageId, response }: { messageId: string; response: string }) => {
      return await apiRequest("PATCH", `/api/admin/messages/${messageId}`, { response });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/messages'] });
      toast({
        title: "Response sent!",
        description: "The user will see your response in their messages.",
      });
      setRespondingTo(null);
      setResponseText("");
    },
    onError: () => {
      toast({
        title: "Failed to send response",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRespond = (messageId: string) => {
    if (responseText.trim().length < 10) {
      toast({
        title: "Response too short",
        description: "Please write at least 10 characters.",
        variant: "destructive",
      });
      return;
    }
    respondMutation.mutate({ messageId, response: responseText });
  };

  const pendingMessages = messages.filter(m => m.status === 'pending');
  const answeredMessages = messages.filter(m => m.status === 'answered');

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent" data-testid="heading-admin">
              Message Dashboard
            </h1>
            <p className="text-muted-foreground" data-testid="text-stats">
              {pendingMessages.length} pending • {answeredMessages.length} answered
            </p>
          </div>

          {isLoading ? (
            <Card className="p-8 text-center text-muted-foreground" data-testid="card-loading">
              Loading messages...
            </Card>
          ) : messages.length === 0 ? (
            <Card className="p-12 text-center space-y-4" data-testid="card-empty">
              <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground/50" />
              <div className="space-y-2">
                <p className="font-medium text-foreground">No messages yet</p>
                <p className="text-sm text-muted-foreground">
                  User messages will appear here when they ask questions.
                </p>
              </div>
            </Card>
          ) : (
            <>
              {pendingMessages.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2" data-testid="heading-pending">
                    <Clock className="w-5 h-5 text-primary" />
                    Pending Responses ({pendingMessages.length})
                  </h2>
                  
                  {pendingMessages.map((message) => (
                    <Card key={message.id} className="p-6 space-y-4 border-l-4 border-l-primary" data-testid={`card-pending-${message.id}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground" data-testid={`text-user-${message.id}`}>
                              User ID: {message.userId}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold" data-testid={`text-subject-${message.id}`}>{message.subject}</h3>
                          <p className="text-sm text-muted-foreground" data-testid={`text-date-${message.id}`}>
                            {format(new Date(message.createdAt || ''), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      </div>

                      <div className="bg-muted/30 rounded-xl p-4">
                        <p className="text-foreground whitespace-pre-wrap" data-testid={`text-message-${message.id}`}>{message.message}</p>
                      </div>

                      {respondingTo === message.id ? (
                        <div className="space-y-3">
                          <Textarea
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Write your response..."
                            className="min-h-32"
                            data-testid={`input-response-${message.id}`}
                          />
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleRespond(message.id)}
                              disabled={respondMutation.isPending}
                              className="bg-gradient-to-r from-primary to-chart-2"
                              data-testid={`button-send-${message.id}`}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              {respondMutation.isPending ? "Sending..." : "Send Response"}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setRespondingTo(null);
                                setResponseText("");
                              }}
                              data-testid={`button-cancel-${message.id}`}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            setRespondingTo(message.id);
                            setResponseText("");
                          }}
                          data-testid={`button-respond-${message.id}`}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Respond
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>
              )}

              {answeredMessages.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2" data-testid="heading-answered">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
                    Answered ({answeredMessages.length})
                  </h2>
                  
                  {answeredMessages.map((message) => (
                    <Card key={message.id} className="p-6 space-y-4 opacity-75" data-testid={`card-answered-${message.id}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">User ID: {message.userId}</span>
                          </div>
                          <h3 className="text-lg font-semibold">{message.subject}</h3>
                          <p className="text-sm text-muted-foreground">
                            Asked: {format(new Date(message.createdAt || ''), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="bg-muted/30 rounded-xl p-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Question:</p>
                        <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
                      </div>

                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                        <p className="text-sm font-medium text-primary mb-2">Your Response:</p>
                        <p className="text-foreground whitespace-pre-wrap">{message.response}</p>
                        {message.respondedAt && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Responded: {format(new Date(message.respondedAt), 'MMM d, yyyy h:mm a')}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
