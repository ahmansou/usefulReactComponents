import React, { useState } from 'react';
import classes from './CatGallery.module.scss';
// i used firestore to get arrays of data that i would use 
import UseFirestore from '../../../hooks/useFirestore';
import ImageModal from './ImageModal/ImageModal';

const ImageCard = (props) => {
	const [showImageModal, setShowImageModal] = useState(false);

	let cardClass = [classes.ImageCard];

	return (
		<div className={cardClass.join(' ')} >
			{
				showImageModal ?
				<ImageModal
				img={props.url}
				modalShow={showImageModal}
				showImageModal={() => setShowImageModal(!showImageModal)} />
				: null
			}
			<div 
				onClick={() => setShowImageModal(!showImageModal)}
				className={classes.Image}
				style={{backgroundImage: `url(${props.url})`}}  
				></div>

		</div>
	)
}

const CatGallery = (props) => {

	// replace this const with an array that you can map through 
	// i used firestore to get my array of data 
	const { docs }  = UseFirestore(props.collection, props.category);

	return (
		<div className={classes.CatGallery} >
			<div className={classes.CatGalleryContainer} >
			{
				docs && docs.map((doc, key) => (
					<ImageCard 
					key={key}
					id={doc.id}
					name={doc.name}
					url={doc.url}
					/>
					))
			}
			</div>
		</div>
	);
}

export default CatGallery;