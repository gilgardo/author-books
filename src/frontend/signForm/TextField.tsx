import { Label } from "@/components/ui/label";
import { useFieldContext } from "./useSignForm";
import { Input } from "@/components/ui/input";

type FormInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "datetime-local"
  | "month"
  | "week"
  | "time"
  | "checkbox"
  | "radio"
  | "range"
  | "file"
  | "color"
  | "hidden"
  | "submit"
  | "reset"
  | "button";

export function TextField({
  id,
  type,
  label,
  placeholder,
}: {
  id: string;
  type?: FormInputType;
  label: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();
  return (
    <div className="grid gap-2 mb-4">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type ?? "text"}
        placeholder={placeholder}
        required
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {field.state.meta.errors && (
        <em className="text-red-500 text-sm mt-1">{field.state.meta.errors}</em>
      )}
    </div>
  );
}
