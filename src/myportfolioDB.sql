CREATE TABLE `client` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `date` VARCHAR(255) NULL,
  `duration` VARCHAR(255) NULL,
    PRIMARY KEY (`id`),
  `id_client` INT NOT NULL
);

CREATE TABLE `skills` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE projectSkills (
    id INT NOT NULL AUTO_INCREMENT,
    skills_id INT NOT NULL,
    project_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_projectSkills_project FOREIGN KEY (project_id) REFERENCES project(id),
    CONSTRAINT fk_projectSkills_skills FOREIGN KEY (skills_id) REFERENCES skills(id)
);



CREATE TABLE `projectSkills`(

)

