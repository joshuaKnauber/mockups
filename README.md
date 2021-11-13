# Mockup Generator

This project was just created as a Three.js exercise, but if you want to contribute please let me know. You can find the deployed project at [mockups.joshuaknauber.com](https://mockups.joshuaknauber.com/)

## Adding Models

The models are located in src>components>models>mockups. Here you can find examples for files

To add your own model follow these steps:

- In you 3D software, name the materials that you want to be editable by adding the suffix `.editable`. (e.g. MyMaterial.editable). These parameters will have their parameters exposed. If they use a texture in their color channel this will be shown and also be editable
- Your model should be about 10x the scale as it would be in reality. The smartphone model for example is about 1.4m high instead of 14cm. This is done to avoid issues with lighting but could be improved in the future
- Export your model as a gltf file. Make sure only few textures are included to keep the file size as low as possible.
- Drop your model file in the components>models>mockups folder. Create a js file with the name of your model (e.g. MyModel.js)
- Copy another models file content into your new file and rename the component (same name as your file so e.g. MyModel)
- Update the import and change the filepath for the gltf import everywhere in the file (at the top in the import, inside the component for useGLTF and at the bottom for the preload)
- Delete all the children of the BaseModel component. These should all be mesh components
- Go to [https://gltf.pmnd.rs/](https://gltf.pmnd.rs/) and drop your gltf file. This should give you a js version of your mesh. Copy everything inside the  \<group> ... <\/group>. This should again all be meshes.
- Paste these into the BaseModel where you just deleted the meshes from the original component
- If you update your gtlf file by changing geometry or assigning different materials you need to repeat this step and update the meshes inside group. You don't need to do this when you're just updating material parameters
- Go to Scene.js in the src folder and add your model to the `modelNames` object. The name will be displayed in the add menu.
- Next, go to MockupScene.js in the scene directory. Import your model js file at the top and add a case statement in the format of the existing ones. Use the key you entered in `modelNames` as the case and return your model component
- That should be all, you can now run the site and should be able to add your model to the scene