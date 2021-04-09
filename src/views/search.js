import {html} from '../../node_modules/lit-html/lit-html.js';
import {search} from './../api/data.js';


const template = (onSubmit,articleTemplate,articles,articleQuery)=> html `
<section id="search-page" class="content">
    <h1>Search</h1>

    <form @submit = ${onSubmit} id="search-form">
        <p class="field search">
            <input id="search-input" type="text" placeholder="Search by article title" name="search" .value=${articleQuery || ''}>
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">

        ${ articles.length > 0  ? articles.map(articleTemplate) : html `
        <h3 class="no-articles">No matching articles</h3>
        ` }

        
    </div>
</section>
`
const template1 = ()=> html `
    <section id="search-page" class="content">
    <h1>Search</h1>
    </section>
`
const articleTemplate = (article)=> html `
    <a class="article-preview" href="/details/${article._id}">
            <article>
                <h3>Topic: <span>${article.title}</span></h3>
                <p>Category: <span>${article.category}</span></p>
            </article>
        </a>
`

export async function searchPage(ctx) {
    const articleQuery = ctx.querystring.split('=')[1];
       
    const articles = await search(articleQuery);

    ctx.render(template(onSubmit,articleTemplate,articles,articleQuery));


    async function onSubmit(event) {
        event.preventDefault();


        const formData = new FormData(event.target);
        const query = formData.get('search');
        if(query == '') {
            return ;
        }
       
       
        ctx.page.redirect('/search?query=' + query);
        
        
    }
}