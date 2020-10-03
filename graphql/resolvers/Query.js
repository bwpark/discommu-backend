module.exports = {
    user: (parent,args,ctx) => {
        return ctx.user || null
    }
}