import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // https://dueivvrnriwhfmvcxuxr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const hasImgPath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imgPath = hasImgPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // A) Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imgPath }]);

  // B) Edit
  if (id) query = query.update(newCabin).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2) Upload cabin
  if (hasImgPath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3) Delete the cabin if storage error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded, and the cabin could not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
