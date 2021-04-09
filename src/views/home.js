import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllArticles } from '../api/data.js';

const template = (data,js,csharp,java,python)=> html `
    <section id="home-page" class="content">
    <h1>Recent Articles</h1>
    
    <section class="recent js">
        <h2>JavaScript</h2>
        <article>
        ${js == undefined ? html `<h3 class="no-articles">No articles yet</h3>` : html `
        
    <h3>${js.title}</h3> 
            <p>${js.content}</p>
            <a href="/details/${js._id}" class="btn details-btn">Details</a>
            `}
            </article>
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        <article>
        ${csharp == undefined ? html `<h3 class="no-articles">No articles yet</h3>` : html `
        
    <h3>${csharp.title}</h3> 
            <p>${csharp.content}</p>
            <a href="/details/${csharp._id}" class="btn details-btn">Details</a>
            `}
            </article>
    </section>
    <section class="recent java">
        <h2>Java</h2>
        <article>
        ${java == undefined ? html `<h3 class="no-articles">No articles yet</h3>` : html `
        
    <h3>${java.title}</h3> 
            <p>${java.content}</p>
            <a href="/details/${java._id}" class="btn details-btn">Details</a>
            `}
            </article>
    </section>
    <section class="recent python">
    <h2>Python</h2>
    <article>
        ${python == undefined ? html `<h3 class="no-articles">No articles yet</h3>` : html `
        
    <h3>${python.title}</h3> 
            <p>${python.content}</p>
            <a href="/details/${python._id}" class="btn details-btn">Details</a>
            `}
            </article>
    </section>
</section>
`



export async function homePage(ctx) {
    const data = await getAllArticles();
    const js = data.find(e => e.category == 'JavaScript');
    console.log(js);
    const csharp = data.find(e => e.category == 'C#');
    console.log(csharp);
    const java = data.find(e => e.category == 'Java');
    const python = data.find(e=> e.category == 'Python');


    ctx.render(template(data,js,csharp,java,python));
     
}