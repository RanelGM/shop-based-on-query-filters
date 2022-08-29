import { Icon } from "components/Common/Icon/Icon";
import { Overlay } from "components/Common/Overlay/Overlay";
import { SearchForm } from "components/Common/SearchForm/SearchForm";
import style from "./SearchFormModal.module.scss";

type SearchFormModalProps = {
  onModalClose: () => void;
};

export const SearchFormModal = (props: SearchFormModalProps) => {
  const { onModalClose } = props;

  return (
    // autoFocus в текущем случае наоборот повышает usability, т.к. это модальное окно с одним input
    // eslint-disable-next-line jsx-a11y/no-autofocus
    <Overlay className={style.overlay} autoFocus>
      <section className={style.component}>
        <SearchForm className={style.searchForm} />
        <button className={style.buttonIcon} onClick={onModalClose}>
          <Icon iconName="cross" />
        </button>
      </section>
    </Overlay>
  );
};
