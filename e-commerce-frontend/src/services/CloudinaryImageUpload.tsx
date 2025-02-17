export default function CloudinaryImageUpload(props: { seturl: (url: string) => void, setName: (name: string) => void }) {
    function handleWidget() {
        const myWidget: CloudinaryWidget = window.cloudinary.createUploadWidget({
            cloudName: 'duujsfghz',
            uploadPreset: 'nweojrbp',
            sources: ['local', 'url', 'camera'],
            clientAllowedFormats: ['image'],
            maxFileSize: 5000000, 
        },
        (error: Error | null, result: { event: string, info: { secure_url: string, original_filename: string } }) => { 
            if (!error && result && result.event === "success") { 
                props.seturl(result.info.secure_url);
                props.setName(result.info.original_filename);
            }
        });

        myWidget.open(); // Now TypeScript knows `myWidget` is of type `CloudinaryWidget`
    }

    return (
        <button 
            id="upload_widget" 
            className="cloudinary-button w-90  text-black font-semibold rounded-full p-2 text-lg" 
            onClick={(e) => { e.preventDefault(); handleWidget(); }}>
            Select Image
        </button>
    );
}
