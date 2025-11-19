import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Send, CheckCircle2, Clock } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Message } from "@shared/schema";
import { format } from "date-fns";

const messageFormSchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type MessageForm = z.infer<typeof messageFormSchema>;

export default function Messages() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ['/api/messages'],
  });

  const form = useForm<MessageForm>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const sendMutation = useMutation({
    mutationFn: async (data: MessageForm) => {
      return await apiRequest("POST", "/api/messages", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
      toast({
        title: "Message sent!",
        description: "I'll get back to you as soon as possible.",
      });
      form.reset();
      setShowForm(false);
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: MessageForm) => {
    sendMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent" data-testid="heading-messages">
                Ask a Question
              </h1>
              <p className="text-muted-foreground" data-testid="text-description">
                Get personalized guidance on your metabolic health journey
              </p>
            </div>
            {!showForm && (
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-primary to-chart-2"
                data-testid="button-new-message"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                New Question
              </Button>
            )}
          </div>

          {showForm && (
            <Card className="p-8" data-testid="card-message-form">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Low morning temperature concerns"
                            data-testid="input-subject"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Question</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your question or concern in detail..."
                            className="min-h-32"
                            data-testid="input-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-primary to-chart-2"
                      disabled={sendMutation.isPending}
                      data-testid="button-send"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {sendMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        form.reset();
                      }}
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </Card>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold" data-testid="heading-your-messages">Your Messages</h2>
            
            {isLoading ? (
              <Card className="p-8 text-center text-muted-foreground" data-testid="card-loading">
                Loading your messages...
              </Card>
            ) : messages.length === 0 ? (
              <Card className="p-12 text-center space-y-4" data-testid="card-empty">
                <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground/50" />
                <div className="space-y-2">
                  <p className="font-medium text-foreground">No messages yet</p>
                  <p className="text-sm text-muted-foreground">
                    Have a question about your metabolic health? Send me a message anytime.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id} className="p-6 space-y-4" data-testid={`card-message-${message.id}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold" data-testid={`text-subject-${message.id}`}>{message.subject}</h3>
                          {message.status === 'answered' ? (
                            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-500" data-testid={`status-answered-${message.id}`}>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Answered</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground" data-testid={`status-pending-${message.id}`}>
                              <Clock className="w-4 h-4" />
                              <span>Pending</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground" data-testid={`text-date-${message.id}`}>
                          {format(new Date(message.createdAt || ''), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Your Question:</p>
                        <p className="text-foreground" data-testid={`text-message-${message.id}`}>{message.message}</p>
                      </div>

                      {message.response && (
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
                          <p className="text-sm font-medium text-primary">Response:</p>
                          <p className="text-foreground whitespace-pre-wrap" data-testid={`text-response-${message.id}`}>{message.response}</p>
                          {message.respondedAt && (
                            <p className="text-xs text-muted-foreground" data-testid={`text-response-date-${message.id}`}>
                              Responded on {format(new Date(message.respondedAt), 'MMM d, yyyy h:mm a')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
