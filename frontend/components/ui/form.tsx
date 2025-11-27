'use client';

import * as React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ children, onSubmit, className, ...props }, ref) => {
    return (
      <form ref={ref} onSubmit={onSubmit} className={cn(className)} {...props}>
        {children}
      </form>
    );
  }
);
Form.displayName = "Form";

interface FormItemProps {
  children: React.ReactNode;
  className?: string;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    );
  }
);
FormItem.displayName = "FormItem";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Label
        ref={ref}
        className={cn(className)}
        {...props}
      />
    );
  }
);
FormLabel.displayName = "FormLabel";

interface FormControlProps {
  children: React.ReactNode;
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
  }
);
FormControl.displayName = "FormControl";

interface FormDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

interface FormMessageProps {
  children: React.ReactNode;
  className?: string;
}

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(({ className, children, ...props }, ref) => {
  if (!children) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}

