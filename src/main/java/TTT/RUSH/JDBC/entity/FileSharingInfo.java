package TTT.RUSH.JDBC.entity;
import java.sql.Time;
import java.util.Date;
import jakarta.persistence.*;
@Entity
@Table(name = "files")
public class FileSharingInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long groupId;//그룹 id

    @Column(nullable = false)
    private String fileName;//파일 이름

    @Lob
    private byte[] fileData;//파일 바이너리

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    @GeneratedValue
    private Date createdDate; // 파일 추가 날짜

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date updatedDate; // 업데이트 날짜

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGroupId(){
        return this.groupId;
    }

    public void setGroupId(Long groupId){
        this.groupId = groupId;
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

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }
}
