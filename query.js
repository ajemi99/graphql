export const query = {
user : `{
    user{
    id
    login
    }
    }`,
     userInfo : `{
    user{
    attrs
    }
    }`,
     xp : `
 {
  transaction_aggregate(where:{type:{_eq:"xp"},eventId:{_eq:41}}
  ) {
  aggregate{
    sum{
      amount
    }
  }
  } 
}
`,

 level : `
  {
   transaction(
    where: { type: { _eq: "level" }, eventId: { _eq: 41 } }
    order_by: { id: desc }
    limit: 1
   ) {
    amount
  }
 }
 `,
projectsQuery : `
 {
  user {
          transactions(
            where: {type: {_eq: "xp"}, object: {type:  {_eq: "project"}},path:{_nlike:"%checkpoint%"}}
              order_by: {createdAt: desc}
          ) {
          object {
            name
            progresses {
              group {
                members {
                  userLogin
                }
              }
            }
          }
          amount
          createdAt
        }
      }
}
`,
 failedAudits : `
{
  user{
    audits_aggregate(where: {closureType:{_eq: failed}}){
      aggregate{
        count
      }
   }
  }
}`,
 succeededAudits: `
{
  user{
    audits_aggregate(where : {closureType:{_eq : succeeded}}){
      aggregate{
        count      
      }
    }
  }
}
`
}
 



