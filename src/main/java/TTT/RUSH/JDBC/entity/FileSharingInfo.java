package TTT.RUSH.JDBC.entity;
import java.sql.Timestamp;
import java.util.Date;
import jakarta.persistence.*;

public class FileSharingInfo {
    
    private Long id;

    private Long partyId;//그룹 id

    private String fileName;//파일 이름

    private byte[] fileData;//파일 바이너리

    private Date createdAt; // 파일 추가 날짜

    private Date updatedAt; // 업데이트 날짜

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPartyId(){
        return this.partyId;
    }

    public void setPartyId(Long partyId){
        this.partyId = partyId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdDate) {
        this.createdAt = createdDate;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}