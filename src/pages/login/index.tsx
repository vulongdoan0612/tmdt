import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";

const Login = () => {
    return (
        <Page title={PAGE_TITLE.LOGIN} loadingData={false}>
            <h1>Login</h1>
        </Page>
    )
}
export default Login;