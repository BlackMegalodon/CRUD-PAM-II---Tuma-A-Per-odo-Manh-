import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput } from "react-native";

import styles from "../styles/styles";

import { getPeople, deletePerson } from "../servers/peopleCrud";

export default function HomeScreen({ navigation }) {
    const [people, setPeople] = useState([]);
    let [filter, setfilter] = useState("");

     const usefilter = (texto) => {
        if((isNaN(texto))&&(texto.length>0)){ 
            let texto2 = texto.charAt(0).toUpperCase() + texto.slice(1)
            setfilter(`?firstname=${encodeURIComponent(texto2)}`);
        }else{
            setfilter("");
        }
    }

    async function loadPeople() {

        const data = await getPeople();

        setPeople(data);
    }
    useState(() => {
        loadPeople();
    }, []);

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Pessoas</Text>

            <TextInput placeholder="Procure pelo Primeiro Nome" onSubmitEditing={(texto) => usefilter(texto.nativeEvent.text)}></TextInput>

            <Button title="Adicionar Pessoa"
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
        </View>
    );
}

function CardPersonal({item, navigation, refresh}){
    return(

        <View style={styles.card}>

            <View>

                <Text style={styles.name}>
                    {item.firstName} {item.lastName}
                </Text>

                <Text style={styles.email}>
                    {item.email}
                </Text>

                <Text style={styles.phone}>
                    {item.phone}
                </Text>

            </View>

            <View>

                <Button
                title="Editar"
                onPress={()=> navigation.navigate("AddEdit",{person:item})}
                />

                <Button
                title="Deletar"
                onPress={async ()=>{
                    await deletePerson(item.id);
                    refresh();
                }}
                />

            </View>

        </View>
    )
}