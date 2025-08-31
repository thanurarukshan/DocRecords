#!/bin/bash

# === Variables (edit as needed) ===
MYSQL_ROOT_USER="root"
MYSQL_ROOT_PASS="your_root_password"
DB_DUMP_FILE="docrecords_db_dump.sql"

NEW_USER="docrecords"
NEW_PASS="Doc_Records123"

# === Step 1: Restore the databases ===
echo "Restoring databases from $DB_DUMP_FILE ..."
mysql -u"$MYSQL_ROOT_USER" -p"$MYSQL_ROOT_PASS" < "$DB_DUMP_FILE"

# === Step 2: Create the user (if not exists) ===
echo "Creating user '$NEW_USER'..."
mysql -u"$MYSQL_ROOT_USER" -p"$MYSQL_ROOT_PASS" <<EOF
CREATE USER IF NOT EXISTS '$NEW_USER'@'%' IDENTIFIED BY '$NEW_PASS';
GRANT ALL PRIVILEGES ON auth_db.* TO '$NEW_USER'@'%';
GRANT ALL PRIVILEGES ON doctor_db.* TO '$NEW_USER'@'%';
GRANT ALL PRIVILEGES ON patient_db.* TO '$NEW_USER'@'%';
FLUSH PRIVILEGES;
EOF

echo "Databases restored and user '$NEW_USER' created with full access."

