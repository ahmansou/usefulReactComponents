import React, {useEffect} from 'react';
import classes from './ImageModal.module.css';
import Aux from '../../../../hoc/Aux';
import {Close} from '@material-ui/icons';

const UseEscape = (showImageModal) => {
	useEffect(() => {
		const unsub = document.addEventListener("keydown", event => {
			if (event.isComposing || event.keyCode === 27) {
				showImageModal();
				return;
			}
		});
		return () => unsub;
	});
}

const imageModal = (props) => {

	UseEscape(props.showImageModal);

	let classMod = [classes.ImageModal, classes.ImageModalForward];
	
	if (props.modalShow)
		classMod = [classes.ImageModal, classes.ImageModalForward];
	else
		classMod = [classes.ImageModal, classes.ImageModalBackward];

	return (
		<Aux>
			<div onClick={props.showImageModal} 
				className={classes.ImageModalBackDrop} ></div>
			<div className={classes.ImageModalClose}
				onClick={props.showImageModal} >
					<Close style={{ fontSize: 50 }}/>
				</div>
			<div className={classMod.join(' ')} >
				<img src={props.img} alt='' />
			</div>
		</Aux>
	);
}

export default imageModal;