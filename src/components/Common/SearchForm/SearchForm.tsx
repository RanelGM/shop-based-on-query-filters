import { FocusEvent, FormEvent, InputHTMLAttributes, KeyboardEvent, MouseEvent, MutableRefObject, useRef } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import useModal from "hooks/useModal";
import { Option } from "types/common";
import { Icon } from "../Icon/Icon";
import style from "./SearchForm.module.scss";

type SearchFormProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  options?: Option[];
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  onSubmit?: (evt: FormEvent) => void;
  onOptionClick?: (evt: MouseEvent) => void;
};

export const SearchForm = (props: SearchFormProps) => {
  const { className, options, inputRef, onSubmit, onOptionClick, onFocus, onKeyDown, placeholder, ...rest } = props;
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [isOptionsModalOpen, optionsModalCallbacks] = useModal({ componentRef });

  const onInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    optionsModalCallbacks.openModal();

    if (onFocus) {
      onFocus(evt);
    }
  };

  const onInputKeydown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      evt.currentTarget.blur();
    }

    if (onKeyDown) {
      onKeyDown(evt);
    }
  };

  const optionClickHandler = (evt: MouseEvent) => {
    optionsModalCallbacks.closeModal();
    const input = inputRef?.current ? inputRef.current : componentRef.current?.querySelector("input");

    if (input) {
      input.value = "";
    }

    if (onOptionClick) {
      onOptionClick(evt);
    }
  };

  return (
    <div className={cn(style.component, className)} ref={componentRef}>
      <form className={style.form} onSubmit={onSubmit}>
        <input
          className={style.input}
          onFocus={onInputFocus}
          onKeyDown={onInputKeydown}
          placeholder={placeholder || "что вы ищете?"}
          ref={inputRef}
          {...rest}
        />
        <button className={style.buttonSearch} type={onSubmit ? "submit" : "button"} tabIndex={onSubmit ? 0 : -1}>
          <Icon className={style.iconSearch} iconName="search" />
        </button>
      </form>

      {isOptionsModalOpen && options && (
        <ul className={style.optionsList}>
          {options.length === 0 ? (
            <li className={style.option}>Ничего не найдено</li>
          ) : (
            options.map((option) => (
              <li key={option.id} id={option.id} className={style.option}>
                <Link className={style.optionLink} to={option.id} onClick={optionClickHandler}>
                  {option.value}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
