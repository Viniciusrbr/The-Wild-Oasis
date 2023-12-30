import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.log(error)
        throw new Error("Não foi possível carregar as cabines");
    }

    return data;
}

export async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`



    // 1 - Create a new cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.log(error)
        throw new Error("Não foi possível criar a cabine");
    }

    // 2 - Upload the image
    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    // 3 - Delete the cabin IF there was an error uploading the image
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id)
        console.error(storageError)
        throw new Error("Não foi possivel fazer upload da imagem e a cabine não foi criada");
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error)
        throw new Error("Não foi possível excluir a cabine");
    }

    return data;
}