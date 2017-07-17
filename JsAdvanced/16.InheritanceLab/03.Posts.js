function solve(){

    class Post{
        constructor(title, content){
            this.title = title;
            this.content = content;
        }

        toString(){
            return `Post: ${this.title} \nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post{
        constructor(title, content, likes, dislikes){
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment){
            this.comments.push(comment);
        }

        toString(){

            if(this.comments.length === 0){
                let res = super.toString();
                return `${res} \nRating: ${this.likes-this.dislikes}`;
            }

            let res = super.toString() + '\n' +
                `Rating: ${this.likes-this.dislikes}` +`\n` +
                `Comments:\n`;
            for(let comment of this.comments){
                res += ` * ${comment}\n`;
            }

            return res;

        }
    }

    class BlogPost extends Post{
        constructor(title, content, views){
            super(title, content);
            this.views = views;
        }

        View(){
            return this.views++;
        }

        toString(){
            return super.toString() +
                `\nViews: ${this.views}`;
        }
    }

    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}



let post = new Post('Post', 'Content');
//console.log(post.toString());
let scm = new SocialMediaPost('TestTitle', 'TestContent', 25,30);
scm.addComment('Good post');
scm.addComment('Very good post');
scm.addComment('Wow!');
console.log(scm.toString());