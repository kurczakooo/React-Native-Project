import { Portal, Dialog, Button, Text } from 'react-native-paper';

type EndDialogProps = {
    content: string;
    title?: string;
    visible?: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
};

export default function EndDialog(props: EndDialogProps) {
    const { title, content, visible, onCancel, onConfirm } = props;
    return (
        <Dialog visible={visible ?? false} dismissable={false}>
            <Dialog.Title>{title ?? 'End Workout'}</Dialog.Title>
            <Dialog.Content>
                <Text variant='bodyMedium'>{content}</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onCancel}>Cancel</Button>
                <Button onPress={onConfirm}>OK</Button>
            </Dialog.Actions>
        </Dialog>
    );
}
