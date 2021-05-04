package se.kth.sda.skeleton.posts;

import javax.persistence.Embeddable;

@Embeddable
public class ContentFile {
    private String base64String;
    private String fileType;

    public ContentFile(String base64String, String fileType) {
        this.base64String = base64String;
        this.fileType = fileType;
    }

    public ContentFile() {

    }

    public String getBase64String() {
        return base64String;
    }

    public void setBase64String(String base64String) {
        this.base64String = base64String;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }
}
