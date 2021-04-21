import { firestore } from '../../firebase/utils';

export const handleAddProduct = (product) =>
	new Promise((resolve, reject) => {
		console.log('Sending it to the firestore...');
		firestore
			.collection('products')
			.doc()
			.set(product)
			.then(() => resolve())
			.catch((err) => reject(err));
	});

export const handleFetchProducts = ({
	filterType='',
	startAfterDoc,
	persistProducts = [],
}) =>
	new Promise((resolve, reject) => {
		const pageSize = 6;
		let ref = firestore
			.collection('products')
			.orderBy('createdDate')
			.limit(pageSize);
		if (filterType) ref = ref.where('category', '==', filterType);
		if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
		ref
			.get()
			.then((snapshot) => {
				const totalCount = snapshot.size;
				const data = [
					...persistProducts,
					...snapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id })),
				];
				console.log('Total count: ' + totalCount);
				resolve({
					data,
					queryDoc: snapshot.docs[totalCount - 1],
					isLastPage: totalCount < 1 || totalCount < pageSize,
				});
			})
			.catch((err) => reject(err));
	});

export const handleDeleteProduct = (uid) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.doc(uid)
			.delete()
			.then(() => resolve())
			.catch((err) => reject(err));
	});
};