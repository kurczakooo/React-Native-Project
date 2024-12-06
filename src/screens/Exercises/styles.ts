import { ThemedStyleFactory } from 'src/types';

const style: ThemedStyleFactory = theme => ({
    container: {
        padding: theme.screenPadding
    }
});

export default style;
