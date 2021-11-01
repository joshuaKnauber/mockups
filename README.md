# Mockup Generator

This project was just created as an exercise for Three.js, but if you want to contribute something please let me know.

## Adding Models

It's fairly easy to add new models to the site (currently there's no way to load them though so maybe don't do this until that exists :/ ).

The models are located in src>components>models. Here you can find examples for files

To add your own model follow these steps:

- Export your model as a gltf file. Make sure no textures are included and keep the file size as low as possible
- Drop your model file in the models folder. Create a js file with the name of your model (e.g. MyModel.js)
- Copy another models file content into your new file and rename the component (same name as your file so e.g. MyModel)
- Rename the import name and change the filepath for the gltf import everywhere in the file (at the top in the import, inside the component for useGLTF and at the bottom for the preload)
- Delete all the children of the BaseModel component. These should all be mesh components
- Go to [https://gltf.pmnd.rs/](https://gltf.pmnd.rs/) and drop your gltf file. This should give you a js version of your mesh. Copy everything inside the  \<group> ... <\/group>. This should again all be meshes.
- Paste these into the BaseModel where you just deleted the meshes from the original component
- If you have a few textures you want to be changable drop them into the models folder as well
- Go into your file and import them at the top of the file the same way the gltf is imported (e.g `import YourImg from './your_img.png'`)
- Find the meshes (you can see the object and material name on the mesh component) your textures apply to and give them an additional parameter for the image like `img={YourImg}`