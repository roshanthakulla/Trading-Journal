"use client";

import * as React from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

export const Form = FormProvider;

export function FormField({ ...props }) {
  return <Controller {...props} />;
}

export function FormItem({ className = "", ...props }) {
  return <div className={`space-y-2 ${className}`} {...props} />;
}

export function FormLabel({ className = "", ...props }) {
  return (
    <label
      className={`text-sm font-medium leading-none ${className}`}
      {...props}
    />
  );
}

export function FormControl({ ...props }) {
  return <div {...props} />;
}

export function FormMessage({ className = "", ...props }) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <p className={`text-sm text-red-500 ${className}`} {...props}>
      {errors?.message?.toString()}
    </p>
  );
}
