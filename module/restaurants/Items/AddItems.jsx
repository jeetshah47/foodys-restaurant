import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View,
    Button,
} from "react-native";
import { theme } from "../../../style/Theme";
import { SelectImage } from "../../utils/imagePicker";
import Checkbox from "expo-checkbox";
import { AddFoodItem } from "./api";
import { uploadImage } from "../../utils/firebaseUpload";
import Loader from "../../common/Loader/Loader";

const Additems = ({ route, navigation }) => {
    const restId = route.params.id;
    const [item, setItem] = useState({
        name: "",
        price: "",
        type: "Veg",
        imgUrl: "",
        nutritionalUrl: "",
    });

    const [itemimage, setitemImage] = useState(null);
    const [nutritientsimage, setnutritientsImage] = useState(null);
    const [isVeg, setisVeg] = useState(true);
    const [countImg, setCountImg] = useState(0);

    const [loading, setLoading] = useState(false);

    const handleApiCall = async () => {
        console.log(item);
        if (item.name === "" || item.price === "" || item.type === "") {
            ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
            return;
        }
        try {
            const result = await AddFoodItem(
                {
                    ...item,
                    price: parseInt(item.price),
                },
                restId
            );
            console.log(result);
            navigation.goBack();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleImageAndApiCall = () => {
        if (itemimage === null || nutritientsimage === null) {
            ToastAndroid.show("Please select both the images", ToastAndroid.SHORT);
            return;
        }
        setLoading(true);
        uploadImage([itemimage, nutritientsimage])
            .then((url) => {
                console.log("result", url);
                setItem({ ...item, imgUrl: url["1"], nutritionalUrl: url["2"] });
                setCountImg(1);
                setLoading(false);
                ToastAndroid.show("Item Added Succesfully", ToastAndroid.SHORT);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                ToastAndroid.show("Error in uploading image", ToastAndroid.SHORT);
            });
    };

    return (
        <View
            style={
                loading
                    ? { ...styles.container, opacity: 0.6 }
                    : { ...styles.container }
            }
        >
            <Text>Add Items</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={item.name}
                onChangeText={(text) => setItem({ ...item, name: text })}
                inputMode="text"
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={item.price}
                onChangeText={(text) => setItem({ ...item, price: text })}
                inputMode="numeric"
                keyboardType="numeric"
            />
            <Text style={{ marginLeft: 10 }}>Type</Text>
            <View style={{ flexDirection: "row", gap: 10, margin: 10 }}>
                <View style={{ flexDirection: "row", gap: 5, margin: 10 }}>
                    <Text>Veg</Text>
                    <Checkbox
                        value={isVeg}
                        color={theme.colors.orange.primary}
                        onValueChange={() => {
                            setisVeg(true);
                            setItem({ ...item, type: "Veg" });
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", gap: 5, margin: 10 }}>
                    <Text>Non-Veg</Text>
                    <Checkbox
                        value={!isVeg}
                        color={theme.colors.orange.primary}
                        onValueChange={() => {
                            setisVeg(false);
                            setItem({ ...item, type: "nonVeg" });
                        }}
                    />
                </View>
            </View>
            {/* <TextInput
                style={styles.input}
                placeholder="Type"
                value={item.type}
                onChangeText={(text) => setItem({ ...item, type: text })}
            /> */}
            <View>
                {loading ? (
                    <View>
                        <Loader display={loading} color={theme.colors.orange.primary} />
                        <Text> Uploaded {countImg}/2 Images </Text>
                    </View>
                ) : (
                    <View style={styles.boxFlex}>
                        <View style={styles.imageBox}>
                            <Text style={{ textAlign: "center" }}>Item Image</Text>
                            <SelectImage image={itemimage} setImage={setitemImage} />
                        </View>

                        <View style={styles.imageBox}>
                            <Text style={{ textAlign: "center" }}>Nutrient Chart</Text>
                            <SelectImage
                                image={nutritientsimage}
                                setImage={setnutritientsImage}
                            />
                        </View>
                    </View>
                )}
                <View style={{ margin: 30, marginVertical: 50 }}>
                    <Pressable>
                        <Button disabled={!itemimage && !nutritientsimage} title="Confirm" onPress={handleImageAndApiCall} />
                    </Pressable>
                </View>
            </View>
            <View style={{ position: "absolute", bottom: 30, width: "100%" }}>
                <Button title="Add Item" onPress={handleApiCall} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.tertiary,
        padding: 20,
        margin: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    boxFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    imageBox: {
        width: "50%",
        height: 150,
        padding: 10,
    },
});

export default Additems;
