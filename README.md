# Mockup Generator

This project was just created as an exercise for Three.js, but if you want to contribute something please let me know.

## Adding Models

It's fairly easy to add new models to the site (currently there's no way to load them though so maybe don't do this until that exists :/ ).

The models are located in src>components>models. Here you can find examples for files

To add your own model follow these steps:

- In you 3D software, name the materials that you want to be editable by adding the suffix `.editable`. (e.g. MyMaterial.editable). These parameters will have their parameters exposed. If they use a texture in their color channel this will also be editable
- Export your model as a gltf file. Make sure only few textures are included to keep the file size as low as possible. If you're exporting your models from blender material colors might be slightly different because of the way blender handles rgb. You'll need to adjust for that manually before exporting
- Drop your model file in the models folder. Create a js file with the name of your model (e.g. MyModel.js)
- Copy another models file content into your new file and rename the component (same name as your file so e.g. MyModel)
- Update the import and change the filepath for the gltf import everywhere in the file (at the top in the import, inside the component for useGLTF and at the bottom for the preload)
- Delete all the children of the BaseModel component. These should all be mesh components
- Go to [https://gltf.pmnd.rs/](https://gltf.pmnd.rs/) and drop your gltf file. This should give you a js version of your mesh. Copy everything inside the  \<group> ... <\/group>. This should again all be meshes.
- Paste these into the BaseModel where you just deleted the meshes from the original component
- If you update your gtlf file by changing geometry or assigning different materials you need to repeat this step and update the meshes inside group. You don't need to do this when you're just updating material parameters