"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { wisp } from "../lib/wisp";

/* ✅ WCAG-compliant shared styles */
const inputClassName = `
  border border-gray-500
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-black
  focus-visible:ring-offset-2
`;

const formSchema = z.object({
  author: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  url: z.union([z.string().url("Please enter a valid URL"), z.string().max(0)]).optional(),
  content: z.string().min(1, "Comment cannot be empty"),
  allowEmailUsage: z.boolean(),
});

interface CommentFormProps {
  slug: string;
  config: {
    enabled: boolean;
    allowUrls: boolean;
    allowNested: boolean;
    signUpMessage: string | null;
  };
  parentId?: string;
  onSuccess?: () => void;
}

interface ErrorResponse {
  error: {
    message: string;
  };
}

interface CreateCommentRequest {
  slug: string;
  author: string;
  email: string;
  url?: string;
  content: string;
  allowEmailUsage: boolean;
  parentId?: string;
}

export function CommentForm({ slug, config, onSuccess }: CommentFormProps) {
  const { toast } = useToast();

  const { mutateAsync: createComment, data } = useMutation({
    mutationFn: async (input: CreateCommentRequest) => {
      try {
        return await wisp.createComment(input);
      } catch (e) {
        if (e instanceof AxiosError) {
          const errorData = e.response?.data as ErrorResponse | undefined;
          if (errorData?.error?.message) {
            throw new Error(errorData.error.message, { cause: e });
          }
        }
        throw e;
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      email: "",
      url: "",
      content: "",
      allowEmailUsage: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createComment({ ...values, slug });
      onSuccess?.();
      form.reset();
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        });
      }
    }
  };

  if (data?.success) {
    return (
      <Alert className="bg-muted border-none">
        <AlertDescription className="space-y-2 text-center">
          <Shield className="text-muted-foreground mx-auto h-10 w-10" />
          <div className="font-medium">Pending email verification</div>
          <div className="text-muted-foreground m-auto max-w-lg text-balance text-sm">
            Thanks for your comment! Please check your email to verify and post your comment.
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <FormField
            control={form.control}
            name="author"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    autoComplete="name"
                    aria-invalid={!!fieldState.error}
                    aria-describedby={fieldState.error ? "author-error" : undefined}
                    className={inputClassName}
                  />
                </FormControl>
                <FormMessage id="author-error" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    required
                    autoComplete="email"
                    aria-invalid={!!fieldState.error}
                    aria-describedby={fieldState.error ? "email-error" : undefined}
                    className={inputClassName}
                  />
                </FormControl>
                <FormMessage id="email-error" />
              </FormItem>
            )}
          />
        </div>

        {/* Website */}
        {config.allowUrls && (
          <FormField
            control={form.control}
            name="url"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Website (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="url"
                    autoComplete="url"
                    aria-invalid={!!fieldState.error}
                    aria-describedby={fieldState.error ? "url-error" : undefined}
                    className={inputClassName}
                  />
                </FormControl>
                <FormMessage id="url-error" />
              </FormItem>
            )}
          />
        )}

        {/* Comment */}
        <FormField
          control={form.control}
          name="content"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  required
                  rows={5}
                  autoComplete="off"
                  aria-invalid={!!fieldState.error}
                  aria-describedby={fieldState.error ? "content-error" : undefined}
                  className={`${inputClassName} min-h-[120px] resize-y`}
                />
              </FormControl>
              <FormMessage id="content-error" />
            </FormItem>
          )}
        />

        {/* Consent */}
        {config.signUpMessage && (
          <FormField
            control={form.control}
            name="allowEmailUsage"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">{config.signUpMessage}</FormLabel>
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="transition motion-reduce:transition-none"
        >
          Post Comment
        </Button>
      </form>
    </Form>
  );
}
