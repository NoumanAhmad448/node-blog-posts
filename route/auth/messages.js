const messages = () => {
    return{
        input_nt_alwd: (value) => {return `${value} is not allowed`},
        data_fetch: `Fetched data successfully`,
        err_msg: `something went wrong`,
        save_msg: `data has been saved`,
        update_msg: `data has been modified`,
        no_rec: `no record is find`,
    }
}
export default messages