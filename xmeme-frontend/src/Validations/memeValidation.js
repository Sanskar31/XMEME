import * as yup from 'yup';

export const memeSchema = yup.object().shape({
	name: yup.string().required(),
	caption: yup.string().required(),
	url: yup.string().required(),
});

export const editMemeSchema = yup.object().shape({
	caption: yup.string().required(),
	url: yup.string().required(),
});
