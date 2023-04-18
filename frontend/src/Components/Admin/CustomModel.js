import { Children, cloneElement, isValidElement, useCallback } from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = ({
                         display,
                         handleClose,
                         children,
                         size,
                         className,
                         backdrop,
                         centered
                     }) => {
    const handleCloseModal = useCallback(
        withSuccess => {
            if (withSuccess === null) {
                handleClose();
            } else {
                handleClose({ withSuccess });
            }
        },
        [handleClose],
    );

    /**
     * In case we decided to pass a prop to the children
     */
    const childrenWithProps = Children.map(children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, { handleClose: handleCloseModal });
        }
        return child;
    });

    return (
        <Modal
            show={display}
            keyboard={false}
            className={className}
            dialogClassName="custom-model-width"
            size={size}
            onHide={handleClose}
            backdrop={backdrop}
            centered={centered}
        >
            {childrenWithProps}
        </Modal>
    );
};

export default CustomModal;
