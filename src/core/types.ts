export interface InputProps<T> {
  value: T;
  onChange: (T) => void;
}
