import React from 'react'
/* import { DropzoneArea } from 'material-ui-dropzone';
import { v4 as uuidv4 } from 'uuid'; */

/* const [uploadedImage, setUploadedImage] = React.useState(null);
const [newProduct, setNewProduct] = React.useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
});


const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Add logic for submitting the form to create a new product
};

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
};

const handleImageDrop = (files) => {
    setUploadedImage(files[0]);
};
 */
function Admin() {
    return (
        <div>
            <h2>Create a new product</h2>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={newProduct.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <TextField
                    label="Category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText="Drag and drop an image or click here to upload"
                    filesLimit={1}
                    onChange={handleImageDrop}
                    maxFileSize={5000000}
                    showAlerts={false}
                    showPreviews={true}
                    showPreviewsInDropzone={false}
                />
                <Button type="submit" variant="contained" color="primary">
                    Create Product
                </Button>
            </form>
        </div>
    );
}

export default Admin