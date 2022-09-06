import { ButtonClose } from "components/Common/Button/ButtonClose";
import { Overlay } from "components/Common/Overlay/Overlay";
import { Sort } from "components/PageScreens/CatalogScreen/Catalog/Sort/Sort";
import style from "./FilterSortModal.module.scss";

type FilterSortModalProps = {
  onModalClose: () => void;
  children: JSX.Element;
};

export const FilterSortModal = (props: FilterSortModalProps) => {
  const { onModalClose, children } = props;

  return (
    <Overlay className={style.overlay}>
      <ButtonClose onClick={onModalClose} />
      {children}
    </Overlay>
  );
};
