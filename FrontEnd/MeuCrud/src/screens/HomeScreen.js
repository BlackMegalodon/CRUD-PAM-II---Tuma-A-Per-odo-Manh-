import React, { useEffect, useState } from "react";
import { View, text, FlatList, Button } from "react-native";

import styles from "../styles/styles";

import { getPeople, deletePerson } from "../servers/peopleCrud";

export default function HomeScreen({ navigation }) {
    const [people, setPeople] = useState([]);

    async function loadPeople() {

        const data = await getPeople();

        setPeople(data);
    }
    useState(() => {
        loadPeople();
    }, []);

    return (

        <view style={styles.container}>

            <text style={styles.title}>Pessoas</text>

            <button title="Adicionar Pessoa"
                onPress={() => navigation.navigate("AddEdit")} />

            <FlatList
                data={people}
                keyExtractor={(item) => item.id.toString()}

                renderItem={({ item }) => (
                    <CardPersonal
                        item={item}
                        navigation={navigation}
                        refresh={loadPeople}
                    />
                )}
            />
        </view>
    );
}
function CardPersonal({ item, navigation, refresh }) {
    return (

        <View style={styles.card}>

            <View>

                <Text style={styles.name}>
                    {item.firstName} {item.lastName}
                </Text>

                <Text style={styles.email}>
                    {item.email}
                </Text>

            </View>

            <View>

                <Button
                    title="Editar"
                    onPress={() => navigation.navigate("AddEdit", { person: item })}
                />

                <Button
                    title="Deletar"
                    onPress={async () => {
                        await deletePerson(item.id);
                        refresh();
                    }}
                />

            </View>

        </View>
    )
}