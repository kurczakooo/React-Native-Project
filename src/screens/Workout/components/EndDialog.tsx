import { Portal, Dialog, Button, Text } from 'react-native-paper';

type EndDialogProps = {
    content: string;
    visible?: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
};

export default function EndDialog(props: EndDialogProps) {
    const { content, visible, onCancel, onConfirm } = props;
    return (
        <Portal>
            <Dialog visible={visible ?? false} dismissable={false}>
                <Dialog.Title>End Workout</Dialog.Title>
                <Dialog.Content>
                    <Text variant='bodyMedium'>{content}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onCancel}>Cancel</Button>
                    <Button onPress={onConfirm}>OK</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
