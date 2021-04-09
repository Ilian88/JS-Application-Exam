import {html} from '../../node_modules/lit-html/lit-html.js';
import { deleteArticle, getAllArticleById } from '../api/data.js';

const template = (article,isOwnerIsLogged,onDelete) => html `
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">

          ${isOwnerIsLogged ? html `  
           <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
            <a href="/edit/${article._id}" class="btn edit">Edit</a>
            ` : ''}

            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</section>
`



export async function detailsPage(ctx) {
    const articleId = ctx.params.id;
    const article = await getAllArticleById(articleId);
    const userId = sessionStorage.getItem('userId');
    let isOwnerIsLogged = userId != null && userId == article._ownerId;

    ctx.render(template(article,isOwnerIsLogged,onDelete));

    async function onDelete() {
        let confirmed = confirm('Are you sure you want to delete this article?');

        if(confirmed) {
            await deleteArticle(articleId);
            ctx.page.redirect('/');
        }
    }
}