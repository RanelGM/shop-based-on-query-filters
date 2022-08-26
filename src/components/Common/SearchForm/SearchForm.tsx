import { FormEvent, InputHTMLAttributes } from "react";
import cn from "classnames";
import { Icon } from "../Icon/Icon";
import style from "./SearchForm.module.scss";

type Option = {
  id: string;
  value: string;
};

type SearchFormProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  options?: Option[];
  onOptionClick?: (evt: MouseEvent) => void;
  onFormSubmit?: (evt: FormEvent) => void;
};

export const SearchForm = (props: SearchFormProps) => {
  const { className, options, onOptionClick, onFormSubmit, ...rest } = props;

  return (
    <div className={cn(style.component, className)}>
      <form className={style.form} onSubmit={onFormSubmit}>
        <input className={style.input} {...rest} />
        <button className={style.buttonSearch} type="submit" tabIndex={-1}>
          <Icon className={style.iconSearch} iconName="search" />
        </button>
      </form>
    </div>
  );
};
