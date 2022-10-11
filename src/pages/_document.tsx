import Document, { Html, Head, Main, NextScript } from 'next/document';
import { BsFillBookmarkCheckFill } from 'react-icons/bs'

export default class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link rel="icon" type="image/svg" href="task-list.svg" />
                    <meta name="description" content="Crie e gerencie suas tarefas com a melhor ferramenta da web" />
                </Head>

                <body>
                    <Main/>
                    <NextScript />
                </body>
            </Html>
        );
    }
}
