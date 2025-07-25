import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import FooterError from "./FooterError";
import TextField from "./TextField";
import Footer from "./Footer";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {
    Footer,
    FooterError,
  },
});
