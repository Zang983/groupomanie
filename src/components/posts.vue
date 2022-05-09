<template>
  <div class="messages_bloc">
      <h2>Les messages sont ici : </h2>
              <article class="user_post" v-for="message in messages" :key="message.messages">
                <div class="header_post">
                    <div class="user_img--post" :key="message.author">
                        {{messages.author}}
                    </div>
                                        <h4>{{message.title}}</h4>
                    <div class="action_post">
                        <button>EDITER {{message.id}}</button>
                        <button v-on:click="deletePostFromList(message.id)">Supprimer</button>
                    </div>
                </div>
                <p class="message_post" v-bind:class="{message_postShort: hidden}">
                    {{message.body}}
                </p>
                <div class="footer_post">
                    <p>{{message.post_date}} <span v-show="message.last_edit_date!=''">(Edité le : {{message.last_edit_date}})</span></p>
                    <p class="post_triangle" v-on:click="showAllMessage()"></p>
                    <div class="action_commentary">
                        <button>+</button>
                        <button>Commentaires</button>
                    </div>

                </div>
            </article>


  </div>
</template>


<script>
export default {
  name: "postList",
  methods: {
        
        getListPost(){//fonction récupérant la liste des posts. Pour l'instant on créer un tableau de faux posts avec du lorem ipsum.
            this.messages[0] = {
            body:"Bonjour, premier post",
            author:"Zangetsu",
            title:"Premier article",
            post_date:"15 avril 2021",
            last_edit_date:"12 mai 2021",
            id:0,
            readerRate : "",
        }
        this.messages[1]=
        {
            body:"Bonjour, second post",
            author:"Z@bimaru",
            title:"Le cours économique de la patate au Zimbabwé",
            post_date:"15 juillet 2021",
            hidden:true,
            last_edit_date:" 12 mai 2022",
            id:1,
            readerRate : "",  
        }
                this.messages[2]=
        {
            body:"Bonjour, second post",
            author:"Z@bimaru",
            title:"Le cours économique de la patate au Vénézuéla",
            post_date:"15 aout 2021",
            hidden:true,
            last_edit_date:" 17 mai 2022",
            id:2,
            readerRate : "",  
        }
                this.messages[3]=
        {
            body:"Bonjour, second post",
            author:"Z@bimaru",
            hidden:true,
            title:"Le cours économique de la carotte au Zimbabwé",
            post_date:"15 decembre 2021",
            last_edit_date:" 18 mai 2022",
            id:3,
            readerRate : "",  
        }

        },
        deletePostFromList(id_message)
        {
            this.messages.splice(id_message,1)
        },
        showAllMessage()
        {

        },
        editPost()
        {
           
        }
    
      
  },
  data() {
    return { 
        messages : [{  
            body:"",
            author:"",
            title:"",
            post_date:"",
            last_edit_date:"",
            id:0,
            hidden:true,
            readerRate : "",
        }]
        }

        },
    beforeMount(){
      this.getListPost()
  }
};
 

</script>
<style lang="scss" scoped>

.user_post
{
    display:flex;
    flex-wrap:wrap;
    border:1px solid lightgray; 
    background-color:white;
    margin-bottom:2%;
    border-radius: 20px;
    box-shadow: 1px 1px 3px 3px gray;
    padding: 0% 2%;
    padding-bottom:1%;
    &:last-child
    {
        margin-bottom:0px;
    }
    .header_post
    {
        display:flex;
        align-items: center;
        width:100%;
        height:50px;
        padding-bottom:4px;
        .user_img--post
        {
            width:30%;
        }
        h4
        {
            margin:0px; 
            width:60%;
        }
        .action_post
        {
            flex:1;
            display:flex;
            justify-content: flex-end;
        }

    }
    .message_post
    {
        line-height: 150%;
        margin:auto;
        margin-top:8px;
        max-width:95%;
        border-top:1px solid blue;
        border-bottom:1px solid blue;
        padding:5px 0;
        &Short
        {
        height:60px;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        }
    }
    .footer_post
    {
        *
        {
            margin:0px;
            font-size:smaller;
        }

        padding-top:15px;
        display:flex;
        width:100%;
        justify-content: space-between;
        align-content: flex-end;
    }
}

.post_triangle
{

        border-top : 17px solid rgb(57, 49, 49);
        border-right : 10px solid transparent;
        border-left : 10px solid transparent; 
        
        &:hover{cursor:pointer}

        &--smaller
        {   
            height : 0px;
            width : 0px;
            border-top : 10px solid rgb(57, 49, 49);
            border-right : 6px solid transparent;
            border-left : 6px solid transparent; 
        }

}
</style>