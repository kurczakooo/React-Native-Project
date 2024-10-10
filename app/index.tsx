import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, Switch } from 'react-native';

export default function Index() {
    // 1. State do zmiany koloru tła
    const [bgColor, setBgColor] = useState('white');
    // 2. State dla licznika
    const [count, setCount] = useState(0);
    // 3. State dla zegara
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    // 4. State dla pola tekstowego
    const [inputText, setInputText] = useState('');
    // 5. State dla przełącznika (Switch)
    const [isEnabled, setIsEnabled] = useState(false);

    // Aktualizowanie zegara co sekundę
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Funkcja zmieniająca kolor tła na losowy
    const changeBackgroundColor = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
            16
        )}`;
        setBgColor(randomColor);
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: bgColor,
            }}
        >
<<<<<<< HEAD
            {/* 1. Zmiana koloru tła */}
            <Button
                title="Change Background Color"
                onPress={changeBackgroundColor}
            />

            {/* 2. Licznik kliknięć */}
            <Text style={{ fontSize: 24, marginTop: 20 }}>Count: {count}</Text>
            <Button
                title="Increase Count"
                onPress={() => setCount(count + 1)}
            />

            {/* 3. Zegar */}
            <Text style={{ fontSize: 24, marginTop: 20 }}>
                Current Time: {time}
            </Text>

            {/* 4. Pole tekstowe */}
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 20,
                    padding: 10,
                    width: 200,
                }}
                placeholder="Enter text"
                onChangeText={setInputText}
            />
            <Text style={{ marginTop: 10 }}>{inputText}</Text>

            {/* 5. Przełącznik (Switch) */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                }}
            >
                <Switch
                    value={isEnabled}
                    onValueChange={() =>
                        setIsEnabled(previousState => !previousState)
                    }
                />
                <Text style={{ marginLeft: 10 }}>
                    {isEnabled ? 'Enabled' : 'Disabled'}
                </Text>
            </View>
=======
            <Text>REACT JEST SUPER</Text>
>>>>>>> 73192df19b6f51bad0f173a0484239524269d853
        </View>
    );
}
