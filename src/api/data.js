import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllArticles(){
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function getcatalogArticles() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}


export async function getAllArticleById(articleId) {
    return await api.get(host + '/data/wiki/' + articleId);
}

export async function createArticle(data) {
    return await api.post(host + '/data/wiki',data);
}

export async function updateArticle(articleId,data){
    return await api.put(host + '/data/wiki/'+ articleId,data);
}

export async function deleteArticle(articleId) {
    return await api.del(host + '/data/wiki/' + articleId);
}

export async function search(query) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`)
}