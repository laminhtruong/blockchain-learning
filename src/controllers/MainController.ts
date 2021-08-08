import {Request, Response} from 'express';
import Joi from 'joi';
import MongoDB from '../MongoDB';
import UserProfile from '../assets/UserProfile.json';
import { Collection } from 'mongodb';

class MainController
{
	constructor()
	{

	}

	Register(req: Request, res: Response)
	{
		const schema = Joi.object({
			email: Joi.string().email().required(),
			name: Joi.string().required(),
			wallet: Joi.string().length(42).required()
		});

		let validate = schema.validate(req.body);
		if (validate.error)
		{
			res.status(400).send({ code: 400, message: validate.error.message });
		}
		else
		{
			let profile = Object.assign({}, UserProfile);
			profile.email = req.body.email;
			profile.name = req.body.name;
			profile.wallet = req.body.wallet;
			profile.create_date = new Date().getTime();

			let collectionUser: Collection = MongoDB.GetCollection('users');
			collectionUser.insertOne(profile)
				.then((docs: any) =>
				{
					res.status(200).send({ code: 200, data: profile });
				})
				.catch((error: any) =>
				{
					res.status(400).send({ code: 400, error: error });
				});
		}
	}
}
export default new MainController;