import classes from './Modal.module.css';
import  ReactDOM from 'react-dom';

const Backdrop = function(props) {
    return <div onClick={props.onClose} className={classes.backdrop}></div>
}

const ModalOverlay = function(props) {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalEl = document.getElementById('overlays');

const Modal = function(props) {
    return <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalEl)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEl)}
    </>
}

export default Modal;