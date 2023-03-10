export interface ReduxAction<T> {
  type: string;
  payload?: T;
}

export interface IChildrenProps {
  children?: React.ReactNode | React.ReactNode[];
}

export interface ISelectOption {
  label: string;
  value: string | number;
}
