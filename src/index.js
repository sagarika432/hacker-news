const { GraphQLServer } = require('graphql-yoga');

//1
//Schema definition


//1 ->dummy data for links 
let links = [{
    id : 'link-0',
    url :'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL-'
},
{
    id : 'link-1',
    url :'https://graphql.org/',
    description: 'Official documentation'
}]
let idCount = links.length
//2 -> implementing the query schema
const resolvers = {
    Query:{
        info : () =>  `This is the API of a Hackernews Clone`,
        feed : () => links
    },
    Mutation : {
        post:(root,args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url:args.url
            }
            links.push(link)
            
            return link
        }
    },
    Link : {
        id: (root) => root.id ,
        description: (root) => root.description,
        url : (root) => root.url
    }
}

//3-> schema and resolvers passed
//Tells what api operations are accepted and how they will be resolved
const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`Server running on http://localhost:4000`))