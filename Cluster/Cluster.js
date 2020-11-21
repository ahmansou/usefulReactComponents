import classes from './Cluster.module.scss';

// Should install react-router-dom if you want to use the cards as links
import { Link } from 'react-router-dom';

// i used firestore to get arrays of data that i would use 
import UseFirestore, {UseFirestoreGallery} from '../../../hooks/useFirestore';

const ClusterItem = (props) => {

	// replace this const with an array that you can map through 
	// i used firestore to get my array of data 
	const { docs }  = UseFirestore("image", props.category);

	let defClass = [classes.ClusterItem];

	if (props.count % 2 === 0) {
		defClass = [classes.ClusterItem, classes.ClusterItem1];
	}
	else if (props.count % 3 === 0) {
		defClass = [classes.ClusterItem, classes.ClusterItem2];
	}
	else {
		defClass = [classes.ClusterItem, classes.ClusterItem3];
	}

	return (
		// Change the tag Link to a div or a tag of your choosing if you 
		// choose not to use the card as a link
		<Link 
			to={'/' + props.url}
			className={defClass.join(' ')}>
			{
			docs && docs.map((doc, key) => (
				doc.main === true ?
					<div key={key}
						className={classes.ClusterItemImage}
						style={{backgroundImage: `url(${doc.url})`}} 
					>
				</div>
				: null
				))
			}
			<h1 className={classes.ClusterItemName} >
				{props.name}
			</h1>
		</Link>
	)
}

const Cluster = (props) => {

	// replace this const with an array that you can map through 
	// i used firestore to get my array of data 
	const {docs} = UseFirestoreGallery("menus");
	// this counter is used to make it easier to chose which card is in what
	// height
	let counter = 0;
	
	return (
		<div className={classes.ClusterContainer}>
			<div className={classes.Cluster} >
				{
				docs && docs.map((doc, key) => (
					counter = counter + 1,
					doc.gallery === true ?
						<ClusterItem
						key={key}
						count={counter}
						category={doc.placement}
						name={doc.name}
						url={doc.url}
						imageShow={props.imageShow}
						/>: null
					))
				}
			</div>
		</div> 
	);
}

export default Cluster;