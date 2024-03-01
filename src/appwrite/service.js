import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

export class Service {
	client = new Client();

	database;
	constructor() {
		this.client.setEndpoint(config.appwriteURL).setProject(config.projectId);
		this.database = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.database.createDocument(
				config.databaseId,
				config.collectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log(error);
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.database.updateDocument(
				config.databaseId,
				config.collectionId,
				slug, // Document ID
				{ title, content, featuredImage, status }
			);
		} catch (error) {
			console.log(error);
		}
	}

	async deletePost(slug) {
		try {
			return await this.database.deleteDocument(
				config.databaseId,
				config.collectionId,
				slug
			);
		} catch (error) {
			console.log(error);
		}
	}

	async getPost(slug) {
		try {
			return await this.database.getDocument(
				config.databaseId,
				config.collectionId,
				slug
			);
		} catch (error) {
			console.log(error);
		}
	}

	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.database.listDocuments(
				config.databaseId,
				config.collectionId,
				queries
			);
		} catch (error) {
			console.log(error);
		}
	}

	async uploadFile(file) {
		try {
			return await this.bucket.createFile(config.bucketId, ID.unique(), file);
		} catch (error) {
			console.log(error);
		}
	}

	async deleteFile(fileId) {
		try {
			return await this.bucket.deleteFile(config.bucketId, fileId);
		} catch (error) {
			console.log(error);
		}
	}

	getFilePreview(fileId) {
		try {
			return this.bucket.getFilePreview(config.bucketId, fileId);
		} catch (error) {
			console.log(error);
		}
	}
}

const service = new Service();
export default service;
