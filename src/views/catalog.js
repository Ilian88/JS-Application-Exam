import {html} from '../../node_modules/lit-html/lit-html.js';
import { getcatalogArticles } from '../api/data.js';

const template = (data,articleTemplate)=> html `
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>

    ${data.length > 0 ? data.map(articleTemplate) 
    : html `
    <!-- No articles message -->
    <h3 class="no-articles">No articles yet</h3>
    `}

</section>
`

const articleTemplate = (article) => html `
    <a class="article-preview" href="/details/${article._id}">
        <article>
            <h3>Topic: <span>${article.title}</span></h3>
            <p>Category: <span>${article.category}</span></p>
        </article>
    </a>
`

export async function catalogPage(ctx){
    const data = await getcatalogArticles();
    console.log(data);

    ctx.render(template(data,articleTemplate));


}